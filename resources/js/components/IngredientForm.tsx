import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SheetDescription } from './ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export default function IngredientForm({ open, setOpen, selected, setSelectedIng, onAddIngredient, currentIngredient = [], mealName}) {

    const getToday = () => new Date().toISOString().split('T')[0];
    const getNextWeek = () => {

        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        return nextWeek.toISOString().split('T')[0];
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setIngForm] = useState({
        ing_name: '',
        ing_type: '',
        unit: '',
        date_arrive: getToday(),
        expiration_date: getNextWeek(),
    });

    useEffect(() => {
        if (selected) {
            setIngForm({
                ing_name: selected.ing_name,
                ing_type: selected.ing_type,
                unit: selected.unit,
                date_arrive: selected.date_arrive,
                expiration_date: selected.expiration_date,

            });

        } else {
            setIngForm({
                ing_name: '',
                ing_type: '',
                unit: '',
                date_arrive: getToday(),
                expiration_date: getNextWeek(),
            });
        }
    }, [selected, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddSubmit = (e, addmore = false) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!form.ing_name || !form.ing_type || !form.unit) {
            toast.error("Please fill in all the fields before submitting.");
            return;
        }

        if (form.expiration_date <= form.date_arrive) {
            toast.error("Expiration date must be after purchase date.");
            return;
        }

        setIsSubmitting(true);

        const ingredient = { ...form };

        if (onAddIngredient) {
            onAddIngredient(ingredient);
        }
        toast.success('Ingredient Added!');

        if (addmore) {
            setIngForm({
                ing_name: '',
                ing_type: '',
                unit: '',
                date_arrive: getToday(),
                expiration_date: getNextWeek(),
            });
            setIsSubmitting(false);
            return;
        }

        setOpen(false);
        setSelectedIng(null);
        setIsSubmitting(false);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (form.expiration_date <= form.date_arrive) {
            toast.error("Expiration date must be after purchase date.");
            return;
        }

        setIsSubmitting(true);

        const data = new FormData();
        data.append('ing_name', form.ing_name);
        data.append('ing_type', form.ing_type);
        data.append('unit', form.unit);
        data.append('date_arrive', form.date_arrive);
        data.append('expiration_date', form.expiration_date);
        data.append('_method', 'PUT');

        router.post(`/kitchen-partner/meals/ingredients/${selected.id}`, data, {
            onSuccess: () => {
                toast.success('Ingredient Updated!');
                router.reload({ only: ['ingredients'] });
                setIsSubmitting(false);
                setOpen(false);
                setSelectedIng(null);
            },
            onError: () => {
                toast.error('Error updating ingredient.');
                setIsSubmitting(false);
            }
        });
    };


    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) setSelectedIng(null);
        }}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{selected ? 'Edit Ingredient' : (
                        <> Add Ingredient for <span className="text-green-500">{mealName}</span></>
                    )}
                    </DialogTitle>
                    <SheetDescription>{selected ? 'Edit existing ingredient details.' : 'Fill in the form to add a new ingredient.'}</SheetDescription>
                </DialogHeader>

                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label>Ingredient Name</Label>
                            <Input
                                name="ing_name"
                                required
                                placeholder="Ingredient name"
                                value={form.ing_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Type</Label>
                            <Input
                                name="ing_type"
                                required
                                placeholder="Ingredient type"
                                value={form.ing_type}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Quantity/Unit</Label>
                            <Input
                                type="text"
                                name="unit"
                                required
                                placeholder="e.g. 10pc/5kg"
                                value={form.unit}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Date Purchased</Label>
                            <Input
                                type="date"
                                name="date_arrive"
                                required
                                value={form.date_arrive}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Expiration Date</Label>
                            <Input
                                type="date"
                                name="expiration_date"
                                required
                                value={form.expiration_date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <h4 className="text-sm font-semibold">Ingredients added:</h4>
                        {currentIngredient.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No ingredients added yet.</p>
                        ) : (
                                <ul className="list-disc pl-4 text-sm">
                                    {currentIngredient.map((ing, i) => (
                                        <li key={i}>
                                            {ing.ing_name} – {ing.unit}
                                            | <span className="text-green-600 font-bold">{ing.date_arrive} </span>
                                            | <span className="text-red-600 font-bold">{ing.expiration_date}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </div>

                    <div className="grid grid-cols-2 gap-5 items-center">
                        {selected ? (
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                onClick={(e) => handleUpdateSubmit(e)}
                                className="w-140 mt-6"
                            >
                                Update
                            </Button>
                        ) : (
                                <>
                                    {/* Add More Button */}
                                    <Button
                                        disabled={isSubmitting}
                                        type="submit"
                                        onClick={(e) => handleAddSubmit(e, true)}
                                        className="w-full mt-6"
                                    >
                                        Add
                                    </Button>
                                    {/* Done Adding Button */}
                                    <Button
                                        disabled={isSubmitting}
                                        type="submit"
                                        onClick={(e) => handleAddSubmit(e, false)}
                                        className="w-full mt-6"
                                    >
                                        Done adding
                                    </Button>
                                </>
                            )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
