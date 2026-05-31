"use client"
import {useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

export default function AboutPage() {
    useEffect(() => {
        console.log("API Base:", process.env.NEXT_PUBLIC_API_BASE);
    },[]);
    return <h1> About Page</h1>;(
        <div className="flex min-h-screen items-center justify-center bg-black p-3">
            <Card className = "w-96">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                About Me
                </CardTitle>
            </CardHeader>
            <CardContent className ="text-center">
                <p className = "mb-4 text-gray-500">
                    Hi! im building a kaban board with Next.js, TypeScript, and Tailwind.
                </p>
                <Button onClick={() =>console.log("clicked")} className="w-full">Click Me</Button>
            </CardContent>
            </Card>
        </div>
    );
}
