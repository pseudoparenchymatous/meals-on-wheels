import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetDescription } from './ui/sheet';
import IngredientForm from './IngredientForm';
import { CirclePlus, LoaderCircle } from 'lucide-react';

export default function MealForm({ setOpen, open, selected, setSelectedMeal, activeTab, showAddButton = true, userType }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientFormOpen, setIngredientFormOpen] = useState(false);
    const [selectedIng, setSelectedIng] = useState(null);

    const [form, setForm] = useState({
        name: '',
        meal_tag: 'Regular Meal',
        preparation_time: '',
        image: null,
    });

    const mealTags = [
        { value: 'Regular Meal', label: 'Regular Meal' },
        { value: 'Diabetic', label: 'Diabetic' },
        { value: 'Lactose Intulerant', label: 'Lactose Intulerant' },
        { value: 'Halal', label: 'Halal' },
        { value: 'Vegan', label: 'Vegan' },
        { value: 'Vegetarian', label: 'Vegetarian' },
        { value: 'High Protein', label: 'High Protein'},
    ];

    useEffect(() => {
        if (selected) {
            setForm({
                name: selected.name,
                meal_tag: selected.meal_tag,
                preparation_time: selected.preparation_time,
                image: null,
            });
        } else {
            setForm({
                name: '',
                meal_tag: 'Regular Meal',
                preparation_time: '',
                image: null,
            });
            setIngredients([])
        }
    }, [selected, open]);

    const handleIngredientAdd = (ingredient) => {
        setIngredients((prev) => [...prev, ingredient]);
    };

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
        data.append('preparation_time', form.preparation_time);

        if (form.image) {
            data.append('image', form.image);
        };

        data.append('ingredients', JSON.stringify(ingredients));

        if (selected) {
            data.append('_method', 'PUT');
            router.post(userType === 'admin' ? `/admin/meals/${selected.id}`: `/kitchen-partner/meals/${selected.id}`, data, {
                onSuccess: () => {
                    setOpen(false);
                    setSelectedMeal(null);
                    setIsSubmitting(false);
                    toast.success("Meal has been Updated!");
                    router.reload({ only: ['meals'] });
                },
            });
        } else {
            router.post('/kitchen-partner/meals', data, {
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
            {showAddButton && (
                <div className="my-5">
                    <DialogTrigger asChild>
                        <Button variant="outline" className="ml-auto" onClick={() => {
                            if(activeTab === 'Meals'){
                                setForm({
                                    name: '',
                                    meal_tag: null,
                                    preparation_time: '',
                                    image: null,
                                });
                                setIngredients([]);
                            }
                        }}>
                            Add meal
                        </Button>
                    </DialogTrigger>
                </div>
            )}
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
                        <Input
                            name="image"
                            type="file"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Button
                            type='button'
                            variant='link'
                            onClick={() => setIngredientFormOpen(true)}
                            >
                            <CirclePlus/><span>Add Ingredient</span>
                        </Button>
                    </div>

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-[#F72585] hover:bg-[#F72585]/90 text-white "
                    >
                        {isSubmitting ? <LoaderCircle className="animate-spin" /> : (selected ? "Update Meal" : "Add Meal")}
                    </Button>
                </form>
            </DialogContent>
            <IngredientForm
                open={ingredientFormOpen}
                setOpen={setIngredientFormOpen}
                selected={selectedIng}
                setSelectedIng={setSelectedIng}
                onAddIngredient={handleIngredientAdd}
                currentIngredient={ingredients}
                mealName={form.name}
            />
        </Dialog>
    );
}
