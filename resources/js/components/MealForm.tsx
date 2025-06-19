import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetDescription } from './ui/sheet';

export default function MealForm({ setOpen, open, selected, setSelectedMeal }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm, setData] = useState({
        name: '',
        meal_tag: '',
        prepared_by: '',
        preparation_time: '',
        image: null,
    });

    const mealTags = [
        { value: 'Diabetic', label: 'Diabetic' },
        { value: 'Lactose Intulerant', label: 'Lactose Intulerant' },
        { value: 'Halal', label: 'Halal' },
        { value: 'Vegan', label: 'Vegan' },
        { value: 'Vegetarian', label: 'Vegetarian' },
    ];

    

    useEffect(() => {
        if (selected) {
            setForm({ 
                name: selected.name,
                meal_tag: selected.meal_tag,
                prepared_by: selected.prepared_by,
                preparation_time: selected.preparation_time,
                image: null,
            });
        } else {
            setForm({ 
                name: '',
                meal_tag: '',
                prepared_by: '',
                preparation_time: '',
                image: null,
            });
        }
    }, [selected, open]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({...prev, [name]: files ? files[0] : value, }));
    };
    

   const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isSubmitting) return;
        setIsSubmitting(true);

        const data = new FormData();
            data.append('name', form.name);
            data.append('meal_tag', form.meal_tag);
            data.append('prepared_by', form.prepared_by);
            data.append('preparation_time', form.preparation_time);
    
        if (form.image) {
            data.append('image', form.image);
        };

        if (selected) {
            data.append('_method', 'PUT'); 
            router.post(`/admin/meals/${selected.id}`, data, {
                onSuccess: () => {
                setOpen(false);
                setSelectedMeal(null);
                setIsSubmitting(false);
                toast.success("Meal has been Updated!");
                router.reload({ only: ['meals'] });
            },
        });
        } else {
            router.post('/admin/meals', data, {
                onSuccess: () => {  
                setOpen(false);
                setSelectedMeal(null);
                setIsSubmitting(false);
                toast.success("Meal has been Added!");
                router.reload({ only: ['meals'] });
            },
        });
    }
};

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen){
                setSelectedMeal(null);
            }
        }}>
            <div className="flex justify-end mb-4 mr-10">
                <DialogTrigger asChild>
                    <Button onClick={() => {
                        setForm({
                            name: '',
                            meal_tag: '',
                            prepared_by: '',
                            preparation_time: '',
                            image: null,
                        });
                    }}>
                        Add Meal
                    </Button>
                </DialogTrigger>
            </div>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{selected ? 'Edit Meal' : 'Add New Meal'}</DialogTitle>
                        <SheetDescription className="">{selected ? 'Admin can update the information of the meal in this form.' : 'Admin can add/create new meal in this form.'}</SheetDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
                    <div className="grid gap-2">
                        <Label>Food Name:</Label>
                        <Input
                            name="name"
                            required
                            placeholder="Meal name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Prepared By:</Label>
                        <Input
                            name="prepared_by"
                            required
                            placeholder="Prepared by"
                            value={form.prepared_by}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Preparation Time:</Label>
                        <Input
                            name="preparation_time"
                            required
                            placeholder="e.g. 30min/1hr"
                            value={form.preparation_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-2">
                    <Label htmlFor="meal_tag">
                        Meal Tag:
                    </Label>
                        <Select
                        name="meal_tag"
                        value={form.meal_tag}
                        onValueChange={(value) => setForm((prev) => ({...prev, meal_tag: value, })) }
                        required
                    >
                        <SelectTrigger id="meal_tag" autoFocus>
                            <SelectValue placeholder="Select meal tag" />
                        </SelectTrigger>
                        <SelectContent>
                            {mealTags.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Meal Image
                            <span className="text-sm text-muted-foreground ml-2">(Optional)</span>
                        </Label>
                        <input
                            name="image"
                            type="file"
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#4361EE] file:text-white hover:file:bg-[#4361EE]/90"
                        />
                    </div>

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-[#F72585] hover:bg-[#F72585]/90 text-white mt-6 "
                    >
                        {isSubmitting ? (selected ? "Updating…" : "Submitting…") : (selected ? "Update Meal" : "Add Meal")}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
