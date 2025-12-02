"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui";
import {
    BookOpen,
    Brain,
    Calendar,
    ChevronRight,
    Clock,
    Flame,
    PlayCircle,
    Plus,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Zap,
} from "lucide-react";

const Page = () => {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Welcome Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, Student! 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Ready to continue your learning journey? Here&apos;s
                        your progress overview.
                    </p>
                </div>
                <Button className="w-fit gap-2">
                    <Plus className="size-4" />
                    New Study Session
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Study Streak
                        </CardTitle>
                        <Flame className="size-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 Days</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-500">+2</span> from last
                            week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Hours This Week
                        </CardTitle>
                        <Clock className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24.5h</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-500">+12%</span> from
                            last week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Courses In Progress
                        </CardTitle>
                        <BookOpen className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">
                            3 completing this month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Goals Achieved
                        </CardTitle>
                        <Target className="size-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8/10</div>
                        <p className="text-xs text-muted-foreground">
                            2 goals remaining
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Continue Learning Section */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PlayCircle className="size-5 text-primary" />
                            Continue Learning
                        </CardTitle>
                        <CardDescription>
                            Pick up where you left off
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Course Item 1 */}
                        <div className="group flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                                <Brain className="size-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="font-semibold">
                                    Advanced Mathematics
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Chapter 5: Differential Equations
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                        <div className="h-full w-[65%] rounded-full bg-primary" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        65%
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <ChevronRight className="size-5" />
                            </Button>
                        </div>

                        {/* Course Item 2 */}
                        <div className="group flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
                                <BookOpen className="size-6 text-blue-500" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="font-semibold">
                                    Physics Fundamentals
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Chapter 3: Newton&apos;s Laws of Motion
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                        <div className="h-full w-[40%] rounded-full bg-blue-500" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        40%
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <ChevronRight className="size-5" />
                            </Button>
                        </div>

                        {/* Course Item 3 */}
                        <div className="group flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
                                <Zap className="size-6 text-green-500" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="font-semibold">
                                    Computer Science 101
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Module 8: Data Structures
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                        <div className="h-full w-[85%] rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        85%
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <ChevronRight className="size-5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Sessions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="size-5 text-primary" />
                            Upcoming Sessions
                        </CardTitle>
                        <CardDescription>
                            Your scheduled study time
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-3">
                            <div className="flex flex-col items-center rounded-md bg-primary px-2 py-1 text-primary-foreground">
                                <span className="text-xs font-medium">NOV</span>
                                <span className="text-lg font-bold">30</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">Math Study Group</p>
                                <p className="text-sm text-muted-foreground">
                                    3:00 PM - 5:00 PM
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg p-3">
                            <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                                <span className="text-xs font-medium">DEC</span>
                                <span className="text-lg font-bold">01</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">
                                    Physics Lab Review
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    10:00 AM - 12:00 PM
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg p-3">
                            <div className="flex flex-col items-center rounded-md bg-muted px-2 py-1">
                                <span className="text-xs font-medium">DEC</span>
                                <span className="text-lg font-bold">02</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">CS Assignment Due</p>
                                <p className="text-sm text-muted-foreground">
                                    11:59 PM
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">
                            View All Sessions
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Weekly Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="size-5 text-primary" />
                            Weekly Activity
                        </CardTitle>
                        <CardDescription>
                            Your study hours over the past week
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-[180px] items-end justify-between gap-2">
                            {[
                                { day: "Mon", hours: 3, height: "30%" },
                                { day: "Tue", hours: 5, height: "50%" },
                                { day: "Wed", hours: 2, height: "20%" },
                                { day: "Thu", hours: 7, height: "70%" },
                                { day: "Fri", hours: 4, height: "40%" },
                                { day: "Sat", hours: 8, height: "80%" },
                                { day: "Sun", hours: 6, height: "60%" },
                            ].map((item) => (
                                <div
                                    key={item.day}
                                    className="flex flex-1 flex-col items-center gap-2"
                                >
                                    <div className="relative w-full">
                                        <div
                                            className="w-full rounded-t-md bg-primary transition-all hover:bg-primary/80"
                                            style={{
                                                height: item.height,
                                                minHeight: "20px",
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {item.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="size-5 text-yellow-500" />
                            Recent Achievements
                        </CardTitle>
                        <CardDescription>
                            Milestones you&apos;ve unlocked
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-yellow-500/10">
                                    <Star className="size-6 text-yellow-500" />
                                </div>
                                <span className="text-sm font-medium">
                                    First Steps
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Completed first course
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-orange-500/10">
                                    <Flame className="size-6 text-orange-500" />
                                </div>
                                <span className="text-sm font-medium">
                                    On Fire
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    7-day streak
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                                    <Brain className="size-6 text-primary" />
                                </div>
                                <span className="text-sm font-medium">
                                    Quick Learner
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    100 lessons done
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
                                    <Target className="size-6 text-green-500" />
                                </div>
                                <span className="text-sm font-medium">
                                    Goal Setter
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Set 10 study goals
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Study Buddies */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                Study Buddies
                            </CardTitle>
                            <CardDescription>
                                Friends who are studying with you
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            Find Buddies
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        {[
                            {
                                name: "Alex Johnson",
                                status: "Studying Math",
                                avatar: "AJ",
                            },
                            {
                                name: "Sarah Williams",
                                status: "Online",
                                avatar: "SW",
                            },
                            {
                                name: "Mike Chen",
                                status: "In a session",
                                avatar: "MC",
                            },
                            {
                                name: "Emily Davis",
                                status: "Away",
                                avatar: "ED",
                            },
                            {
                                name: "James Wilson",
                                status: "Online",
                                avatar: "JW",
                            },
                        ].map((buddy) => (
                            <div
                                key={buddy.name}
                                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                            >
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {buddy.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">
                                        {buddy.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {buddy.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
