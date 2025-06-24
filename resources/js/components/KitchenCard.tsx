import { Clock3, ShieldAlert, Utensils } from "lucide-react";

export default function KitchenCard ({assignments = [], expiringIngredients = [] }) {

    const totalMealsToday = assignments.length;
    const preparingCount = assignments.filter(item => item.status === 'preparing').length;


    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Utensils  className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Meals</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalMealsToday}</p>
                        </div>
                </div>
            </div>
                    
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <Clock3  className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white"> {preparingCount}
                            </p>
                        </div>
                </div>
            </div>
                    
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <ShieldAlert  className="w-6 h-6 text-yellow-500 dark:text-purple-400" />
                    </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring Ingredients</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiringIngredients.length}</p>
                        </div>
                </div>
            </div>           
        </div>
    )
}