import { router } from "@inertiajs/react";

export default function Meallist({ meals, onEdit, fetchMeals }) {

    const deleteMeal = (id) => {
        if (!confirm("Delete meal?")) return;
        router.delete(`/admin/meals/${id}`);
    };
    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-4 border-b">Image</th>
                        <th className="px-6 py-4 border-b">Meal name</th>
                        <th className="px-6 py-4 border-b">Prepared By</th>
                        <th className="px-6 py-4 border-b">Prep Time</th>
                        <th className="px-6 py-4 border-b">Type</th>
                        <th className="px-6 py-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal) => (
                        <tr key={meal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 border-b">
                                <img
                                    src={meal.image_path}
                                    alt={meal.title}
                                    className="h-16 w-16 object-cover rounded"
                                />
                            </td>
                            <td className="px-6 py-4 border-b">{meal.title}</td>
                            <td className="px-6 py-4 border-b">{meal.prepared_by}</td>
                            <td className="px-6 py-4 border-b">{meal.preparation_time} min</td>
                            <td className="px-6 py-4 border-b">{meal.meal_type}</td>
                            <td className="px-6 py-4 border-b space-x-2">
                                <button onClick={() => onEdit(meal)} className="text-blue-600 hover:underline">Edit</button>
                                <button onClick={() => deleteMeal(meal.id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}