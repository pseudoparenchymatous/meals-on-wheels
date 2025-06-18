import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function WeeklyPlanner() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        startDate: null,
    });

    function createWeeklyPlan(e) {
        e.preventDefault();
        post(route('weekly-plans.store'), {
            onSuccess: () => {
                setDialogOpen(false);
                reset();
                toast.success("Weekly plan created");
            }
        });
    }

    return (
        <div>
            <Toaster position="top-center" richColors />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Weekly Plan</Button>
                </DialogTrigger>
                <DialogContent className="w-100">
                    <form onSubmit={createWeeklyPlan}>
                        <DialogHeader>
                            <DialogTitle>Create Weekly Plan</DialogTitle>
                            <DialogDescription>Select start date for the weekly plan</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <Label htmlFor="date-picker">Start Date</Label>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date-picker"
                                        variant="outline"
                                        data-empty={!data.startDate}
                                        className={cn(
                                            "justify-start text-left font-normal",
                                            !data.startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {data.startDate ? format(data.startDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        disabled={[
                                            { before: new Date() },
                                            { dayOfWeek: [0, 2, 3, 4, 5, 6] }
                                        ]}
                                        mode="single"
                                        selected={data.startDate}
                                        onSelect={date => {
                                            setData('startDate', format(date, 'P'));
                                            setCalendarOpen(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>Save Plan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

