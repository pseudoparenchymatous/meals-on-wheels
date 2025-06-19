import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SheetDescription } from './ui/sheet';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export default function IngredientForm({ open, setOpen, selected, setSelectedIng, activeTab }) {
    
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
        stocks: '',
        date_arrive: getToday(),
        expiration_date: getNextWeek(),
    });

  useEffect(() => {
    if (selected) {
        setIngForm({
            ing_name: selected.ing_name,
            ing_type: selected.ing_type,
            stocks: selected.stocks,
            date_arrive: selected.date_arrive,
            expiration_date: selected.expiration_date,
        });
    } else {
        setIngForm({
            ing_name: '',
            ing_type: '',
            stocks: '',
            date_arrive: getToday(),
            expiration_date: getNextWeek(),
            });
        }
    }, [selected, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

    if (form.expiration_date <= form.date_arrive) {
        toast.error("Expiration date must be after purchase date.");
        setIsSubmitting(false);
        return;
    }

    const data = new FormData();
        data.append('ing_name', form.ing_name);
        data.append('ing_type', form.ing_type);
        data.append('stocks', form.stocks);
        data.append('date_arrive', form.date_arrive);
        data.append('expiration_date', form.expiration_date);

    if (selected) {
        data.append('_method', 'PUT');
        router.post(`/admin/meals/${selected.id}`, data, {
            onSuccess: () => {
                setOpen(false);
                setSelectedIng(null);
                setIsSubmitting(false);
                toast.success('Ingredient has been updated!');
                router.reload({ only: ['ingredients'] });
            },
        });
    } else {
        router.post('/admin/meals', data, {
            onSuccess: () => {
                setOpen(false);
                setSelectedIng(null);
                setIsSubmitting(false);
                toast.success('Ingredient has been added!');
                router.reload({ only: ['ingredients'] });
            },
        });
        }
    };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
            if (!isOpen) setSelectedIng(null);
        }}>
        <div className="flex justify-end mb-4 mr-10">
            <DialogTrigger asChild>
                <Button onClick={() => {
                    setIngForm({
                        ing_name: '',
                        ing_type: '',
                        stocks: '',
                        date_arrive: getToday(),
                        expiration_date: getNextWeek(),
                    });
                }}>
                    {activeTab === 'Meals' ? 'Add Meal' : 'Add Ingredient'}
                </Button>
            </DialogTrigger>
      </div>

        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle>{selected ? 'Edit Ingredient' : 'Add New Ingredient'}</DialogTitle>
                    <SheetDescription>{selected ? 'Edit existing ingredient details.' : 'Fill in the form to add a new ingredient.'}</SheetDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                    <Label>Stocks</Label>
                    <Input
                        type="number"
                        name="stocks"
                        required
                        placeholder="e.g. 10"
                        value={form.stocks}
                        onChange={handleChange}
                    />
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

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#F72585] hover:bg-[#F72585]/90 text-white mt-6"
                >
                    {isSubmitting ? (selected ? "Updating…" : "Submitting…") : (selected ? "Update Ingredient" : "Add Ingredient")}
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  );
}
