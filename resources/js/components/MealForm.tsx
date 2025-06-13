import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { router } from '@inertiajs/react';

export default function MealForm({ fetchMeals, selected, setSelectedMeal }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        title: '',
        meal_type: '',
        prepared_by: '',
        preparation_time: '',
        image: null,
    });

    const mealTypes = [
        { value: 'Breakfast', label: 'Breakfast' },
        { value: 'Lunch', label: 'Lunch' },
        { value: 'Dinner', label: 'Dinner' },
        { value: 'Snacks', label: 'Snacks' },
        { value: 'Dessert', label: 'Dessert' },
    ];

    useEffect(() => {
        if (selected) {
            setForm({
                title: selected.title,
                meal_type: selected.meal_type,
                prepared_by: selected.prepared_by,
                preparation_time: selected.preparation_time,
                image: null,
            });
        }
    }, [selected]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };
    

   const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
        data.append('title', form.title);
        data.append('meal_type', form.meal_type); // ← this is key
        data.append('prepared_by', form.prepared_by);
        data.append('preparation_time', form.preparation_time);
    if (form.image) {
        data.append('image', form.image);
    }

    if (selected) {
        router.post(`/admin/meals/${selected.id}`, data, {
            preserveScroll: true,
            onSuccess: () => {
                fetchMeals();
                setOpen(false);
                setSelectedMeal(null);
            },
        });
    } else {
        router.post('/admin/meals', data, {
            preserveScroll: true,
            onSuccess: () => {  
                setOpen(false);
            },
        });
    }
};

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex justify-end mb-4 mr-8">
                <DialogTrigger asChild>
                    <Button onClick={() => {
                        setForm({
                            title: '',
                            meal_type: '',
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
                            placeholder="Dishes..."
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Prepared By:</Label>
                        <Input
                            name="prepared_by"
                            placeholder="Cooked by"
                            value={form.prepared_by}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Preparation Time:</Label>
                        <Input
                            name="preparation_time"
                            placeholder="Input prepared time"
                            value={form.preparation_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <select
                            name="meal_type"
                            id="meal_type"
                            value={form.meal_type}
                            onChange={handleChange}
                            className="block w-full appearance-none rounded-md border border-input bg-background px-4 py-2 pr-10 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="" disabled>Choose meal type</option>
                                {mealTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                                v
                            </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Meal Image</Label>
                        <input
                            name="image"
                            type="file"
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#4361EE] file:text-white hover:file:bg-[#4361EE]/90"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#F72585] hover:bg-[#F72585]/90 text-white mt-6"
                    >
                        {selected ? 'Update' : 'Add'} Meal
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}