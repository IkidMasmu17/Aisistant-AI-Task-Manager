import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

interface CalendarEvent {
    id: string;
    summary: string;
    description?: string;
    start: { dateTime?: string; date?: string };
    end: { dateTime?: string; date?: string };
    location?: string;
    htmlLink: string;
}

export default function CalendarPage() {
    const { user, googleAccessToken, signInWithGoogle } = useAuth();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (googleAccessToken) {
            fetchEvents();
        }
    }, [googleAccessToken]);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                "https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=" +
                new Date().toISOString(),
                {
                    headers: {
                        Authorization: `Bearer ${googleAccessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }

            const data = await response.json();
            setEvents(data.items || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load calendar events. Please try connecting again.");
        } finally {
            setLoading(false);
        }
    };

    const formatEventTime = (dateString?: string) => {
        if (!dateString) return "All Day";
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatEventDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                    <CalendarIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Sign in to view Calendar</h2>
                <p className="text-gray-500 mb-6 max-w-md">
                    Please sign in to your account to access your Google Calendar integration.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">My Calendar</h2>
                    <p className="text-gray-500">Upcoming events from your Google Calendar</p>
                </div>
                {!googleAccessToken && (
                    <Button onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Connect Google Calendar
                    </Button>
                )}
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {error}
                    <Button variant="link" onClick={signInWithGoogle} className="ml-2 text-red-700 underline">
                        Reconnect
                    </Button>
                </div>
            )}

            {!googleAccessToken && !loading && !events.length && !error && (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <CalendarIcon className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">Calendar not connected</h3>
                        <p className="text-gray-500 text-sm mb-4 max-w-sm">
                            Connect your Google Calendar to see your upcoming events and schedule directly in your dashboard.
                        </p>
                        <Button onClick={signInWithGoogle} variant="outline">
                            Connect Now
                        </Button>
                    </CardContent>
                </Card>
            )}

            {loading && (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
            )}

            {googleAccessToken && events.length > 0 && (
                <div className="grid gap-4">
                    {events.map((event) => (
                        <Card key={event.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-start gap-4">
                                <div className="flex-shrink-0 w-16 text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                                    <div className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase">
                                        {formatEventDate(event.start.dateTime || event.start.date).split(' ')[0]}
                                    </div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        {formatEventDate(event.start.dateTime || event.start.date).split(' ')[2]}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg truncate pr-4">
                                        <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {event.summary}
                                        </a>
                                    </h3>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {event.start.dateTime ? (
                                                <span>
                                                    {formatEventTime(event.start.dateTime)} - {formatEventTime(event.end.dateTime)}
                                                </span>
                                            ) : (
                                                <span>All Day</span>
                                            )}
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-1 truncate max-w-[200px]">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {googleAccessToken && !loading && events.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No upcoming events found.</p>
                </div>
            )}
        </div>
    );
}
