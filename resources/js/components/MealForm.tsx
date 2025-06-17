import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export default function MealForm({ setOpen, open, selected, setSelectedMeal }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        title: '',
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
                title: selected.title,
                meal_tag: selected.meal_tag,
                prepared_by: selected.prepared_by,
                preparation_time: selected.preparation_time,
                image: null,
            });
        } else {
            setForm({ 
                title: '',
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
            data.append('title', form.title);
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
            <div className="flex justify-end mb-4 mr-8">
                <DialogTrigger asChild>
                    <Button onClick={() => {
                        setForm({
                            title: '',
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
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
                    <div className="grid gap-2">
                        <Label>Food Name:</Label>
                        <Input
                            name="title"
                            required
                            placeholder="Meal name"
                            value={form.title}
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
                            placeholder="Prepared Meal time"
                            value={form.preparation_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <Label>Meal Tag:</Label>
                        <select
                            name="meal_tag"
                            id="meal_tag"
                            required
                            value={form.meal_tag}
                            onChange={handleChange}
                            className="block w-full appearance-none rounded-md border border-input bg-background mt-2 px-4 py-2 pr-10 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="" disabled>Choose Meal type </option>
                                {mealTags.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                            <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500">
                                v
                            </div>
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
                        {isSubmitting ? "Submiting... " : (selected ? 'Update Meal' : 'Add Meal')}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
