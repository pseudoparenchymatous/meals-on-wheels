import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Head, Link, useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FormEvent, useState } from "react";
import InputError from "@/components/input-error";

type WeeklyPlan = {
    id: number,
    start_date: string,
};

type MealAssignment = {
    day: string,
    weekly_plan_id: number,
};

type KitchenPartner = {
    id: number,
    org_name: string,
    meals: Meal[],
};

type Meal = {
    id: number,
    name: string,
    meal_tag: string,
};

type Member = {
    id: number,
    name: string,
    diet: string | null,
    mealAssignments: MealAssignment[],
};

type Rider = {
    id: number,
    first_name: string,
    last_name: string,
};

interface AssignMealProps {
    kitchenPartners: KitchenPartner[],
    members: Member[],
    meals: Meal[],
    riders: Rider[],
    weeklyPlans: WeeklyPlan[],
}

export default function AssignMeal({ kitchenPartners, members, riders, weeklyPlans }: AssignMealProps) {
    const [openMemberPopover, setOpenMemberPopover] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        day: '',
        weeklyPlanId: 0,
        memberIndex: 0,
        memberId: 0,
        mealId: '',
        kitchenPartnerId: 0,
        riderId: '',
    });

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        post(route('admin.meal-assignments.store'));
    }

    const daysOfWeek = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
    ];

    return (
        <AdminLayout>
            <Head title="Assign Meal" />
            <div>
                <h1 className="font-semibold text-xl mb-8">Assign a Meal</h1>
                <form onSubmit={onSubmit} className="border flex flex-col gap-6 p-5 rounded-lg w-fit">
                    <div>
                        <div className="flex gap-4 items-center justify-between">
                            <Label htmlFor="member">Member</Label>
                            <Popover open={openMemberPopover} onOpenChange={setOpenMemberPopover}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openMemberPopover}
                                        className="w-[200px] justify-between"
                                    >
                                        {data.memberId
                                            ? members.find(member => member.id === Number(data.memberId))?.name
                                            : "Select member..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search member..." />
                                        <CommandList>
                                            <CommandEmpty>No member found.</CommandEmpty>
                                            <CommandGroup>
                                                {members.map((member, index) => (
                                                    <CommandItem
                                                        key={member.id}
                                                        value={member.name}
                                                        onSelect={selectedName => {
                                                            setData('memberId', members.find(member => member.name == selectedName)?.id || 0);
                                                            setData("memberIndex", index);
                                                            setOpenMemberPopover(false);
                                                        }}
                                                    >
                                                        {member.name}
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                data.memberId === member.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <InputError message={errors.memberId} />
                    </div>
                    <div>
                        <div className="flex gap-4 items-center justify-between">
                            <Label htmlFor="week">Week</Label>
                            <Select disabled={data.memberId === 0} value={data.weeklyPlanId.toString()} onValueChange={(value) => setData('weeklyPlanId', Number(value))}>
                                <SelectTrigger id="week" className="p-5 w-auto">
                                    <SelectValue placeholder="Select week" />
                                </SelectTrigger>
                                <SelectContent>
                                    {weeklyPlans.map(plan => (
                                        <SelectItem key={plan.id} value={plan.id.toString()}>
                                            Week {plan.id} - {plan.start_date}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.weeklyPlanId} />
                    </div>
                    <div>
                        <div className="flex gap-4 items-center justify-between">
                            <Label htmlFor="day">Day</Label>
                            <Select disabled={data.weeklyPlanId === 0}value={data.day} onValueChange={(value) => setData('day', value)}>
                                <SelectTrigger id="day" className="w-auto">
                                    <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent>
                                    {daysOfWeek.filter(day => {
                                        const assignments = members[data.memberIndex].mealAssignments
                                        const arrayLength = assignments.length
                                        for (let i = 0; i < arrayLength; i++) {
                                            if (data.weeklyPlanId === assignments[i].weekly_plan_id
                                                && day.value === assignments[i].day) {
                                                return false;
                                            }
                                        }

                                        return true;

                                    }).map(day => (
                                        <SelectItem key={day.value} value={day.value}>
                                            {day.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.day} />
                    </div>
                    <div>
                        <div className="flex gap-4 items-center justify-between">
                            <Label htmlFor="kitchen">Kitchen</Label>
                            <Select disabled={!data.day} value={data.kitchenPartnerId.toString()} onValueChange={(value) => setData('kitchenPartnerId', Number(value))}>
                                <SelectTrigger id="kitchen" className="w-auto">
                                    <SelectValue placeholder="Kitchen" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kitchenPartners.map(kitchen => (
                                        <SelectItem key={kitchen.id} value={kitchen.id.toString()}>
                                            {kitchen.org_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.kitchenPartnerId} />
                    </div>
                    <div>
                        <div className="flex gap-4 items-center justify-between">
                            <Label htmlFor="meal">Meal</Label>
                            <Select disabled={data.kitchenPartnerId === 0} value={data.mealId} onValueChange={(value) => setData('mealId', value)}>
                                <SelectTrigger id="meal" className="w-auto">
                                    <SelectValue placeholder="Meal" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kitchenPartners.find(partner => partner.id == data.kitchenPartnerId)?.meals.filter(meal => {
                                        const member = members.find(member => member.id === Number(data.memberId));

                                        if (member) {
                                            if (!member.diet) {
                                                return true;
                                            }

                                            if (member.diet.toUpperCase() === meal.meal_tag.toUpperCase()) {
                                                return true;
                                            }
                                        }

                                        return false;
                                    }).map(meal => (
                                            <SelectItem key={meal.id} value={meal.id.toString()}>
                                                {meal.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.mealId} />
                    </div>
                    <div>
                        <div className="flex gap-4 items-center justify-between">
                            <Label htmlFor="rider">Rider</Label>
                            <Select value={data.riderId} onValueChange={(value) => setData('riderId', value)}>
                                <SelectTrigger id="rider" className="w-auto">
                                    <SelectValue placeholder="Rider" />
                                </SelectTrigger>
                                <SelectContent>
                                    {riders.map(rider => (
                                        <SelectItem key={rider.id} value={rider.id.toString()}>
                                            {rider.first_name} {rider.last_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.riderId} />
                    </div>
                    <div className="flex gap-4">
                        <Button asChild variant="outline">
                            <Link href={route('admin.meal-assignments.index')}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
