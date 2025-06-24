import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Filter, Download, Mail, Heart, DollarSign, Calendar, Users, AlertTriangle, Edit, X } from 'lucide-react';
import { router } from '@inertiajs/react';

// Import shadcn/ui components
import { Calendar as CalendarPicker } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function DonorManagementCom({ donors = [], stats = {} }) {
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    
    // New state for cancel and edit dialogs
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        donor_name: '',
        donor_email: '',
        amount: '',
        frequency: 'monthly',
        next_payment_date: ''
    });

    // Filter donors based on search and filters
    const filteredDonors = donors.filter(donor => {
        const matchesSearch = donor.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             donor.donor_email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === 'all' || donor.status === filterStatus;
        const matchesType = filterType === 'all' || donor.donation_type === filterType;
        
        return matchesSearch && matchesStatus && matchesType;
    });

    // Get recurring donors
    const recurringDonors = donors.filter(donor => donor.donation_type === 'recurring');

    // Get recent donors (last 30 days)
    const recentDonors = donors.filter(donor => {
        const donationDate = new Date(donor.created_at);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return donationDate >= thirtyDaysAgo;
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'completed': 'bg-green-100 text-green-800 border-green-200',
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'failed': 'bg-red-100 text-red-800 border-red-200',
            'cancelled': 'bg-gray-100 text-gray-800 border-gray-200',
            'active': 'bg-green-100 text-green-800 border-green-200'
        };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || statusColors.pending}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getTypeBadge = (type) => {
        return type === 'recurring' ? (
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-0">
                <Heart className="w-3 h-3 mr-1" />
                Recurring
            </Badge>
        ) : (
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-0">
                One-time
            </Badge>
        );
    };

    const handleDeleteClick = (donor) => {
        setSelectedDonor(donor);
        setDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedDonor) {
            setIsDeleting(true);
            router.delete(`/admin/donors/${selectedDonor.id}`, {
                onSuccess: () => {
                    setDialogOpen(false);
                    setSelectedDonor(null);
                    setIsDeleting(false);
                },
                onError: () => {
                    setIsDeleting(false);
                }
            });
        }
    };

    // New handlers for cancel and edit
    const handleCancelClick = (donor) => {
        setSelectedDonor(donor);
        setCancelDialogOpen(true);
    };

    const handleEditClick = (donor) => {
        setSelectedDonor(donor);
        setEditForm({
            donor_name: donor.donor_name || '',
            donor_email: donor.donor_email || '',
            amount: donor.amount || '',
            frequency: donor.frequency || 'monthly',
            next_payment_date: donor.next_payment_date ? new Date(donor.next_payment_date).toISOString().split('T')[0] : ''
        });
        setEditDialogOpen(true);
    };

    const handleCancelConfirm = async () => {
        if (!selectedDonor) return;
        
        setIsCanceling(true);
        try {
            // Using Inertia router for the cancel request
            router.put(`/admin/donors/${selectedDonor.id}/cancel`, {}, {
                onSuccess: () => {
                    setCancelDialogOpen(false);
                    setSelectedDonor(null);
                    setIsCanceling(false);
                },
                onError: () => {
                    setIsCanceling(false);
                }
            });
        } catch (error) {
            console.error('Error cancelling recurring donation:', error);
            setIsCanceling(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDonor) return;
        
        setIsEditing(true);
        try {
            // Using Inertia router for the update request
            router.put(`/admin/donors/${selectedDonor.id}`, editForm, {
                onSuccess: () => {
                    setEditDialogOpen(false);
                    setSelectedDonor(null);
                    setIsEditing(false);
                },
                onError: () => {
                    setIsEditing(false);
                }
            });
        } catch (error) {
            console.error('Error updating recurring donation:', error);
            setIsEditing(false);
        }
    };

    const renderRecurringActions = (donor) => (
        <div className="flex gap-2">
            <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditClick(donor)}
                className="flex items-center gap-1"
            >
                <Edit className="w-4 h-4" />
                Edit
            </Button>
            <Button
                size="sm"
                variant="outline"
                onClick={() => handleCancelClick(donor)}
                className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
                <X className="w-4 h-4" />
                Cancel
            </Button>
        </div>
    );

    const handleExport = () => {
        // Convert donors data to CSV
        const csvContent = [
            ['ID', 'Name', 'Email', 'Amount', 'Type', 'Status', 'Date', 'Anonymous'].join(','),
            ...filteredDonors.map(donor => [
                donor.id,
                `"${donor.donor_name}"`,
                donor.donor_email,
                donor.amount,
                donor.donation_type,
                donor.status,
                formatDate(donor.created_at),
                donor.is_anonymous ? 'Yes' : 'No'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `donors-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            {/* Header with Stats */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Donor Management</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Donors</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_donors || donors.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Raised</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(stats.total_amount || donors.reduce((sum, donor) => sum + parseFloat(donor.amount || 0), 0))}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recurring Donors</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recurring_donors || recurringDonors.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recent_donors || recentDonors.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Donors</TabsTrigger>
                    <TabsTrigger value="recent">Recent (30 days)</TabsTrigger>
                    <TabsTrigger value="recurring">Recurring Donors</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {/* Search and Filters */}
                    <div className="mb-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search donors by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="one_time">One-time</SelectItem>
                                <SelectItem value="recurring">Recurring</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" onClick={handleExport}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>

                    <div className="border rounded-xl">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Donor Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDonors.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                            No donors found matching your criteria
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredDonors.map(donor => (
                                        <TableRow key={donor.id}>
                                            <TableCell className="font-medium">#{donor.id}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{donor.donor_name}</div>
                                                    {donor.is_anonymous && (
                                                        <div className="text-xs text-gray-500">Anonymous</div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{donor.donor_email}</TableCell>
                                            <TableCell className="font-medium">{formatCurrency(donor.amount)}</TableCell>
                                            <TableCell>
                                                {getTypeBadge(donor.donation_type)}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(donor.status)}
                                            </TableCell>
                                            <TableCell>{formatDate(donor.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {/* Email and View buttons 
                                                    <Button size="sm" variant="outline">
                                                        <Mail className="w-4 h-4 mr-1" />
                                                        Email
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        View
                                                    </Button>
                                                    */}
                                                    <Button 
                                                        size="sm" 
                                                        variant="destructive"
                                                        onClick={() => handleDeleteClick(donor)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="recent">
                    <div className="border rounded-xl">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Donor Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentDonors.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                            No recent donations found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    recentDonors.map(donor => (
                                        <TableRow key={donor.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{donor.donor_name}</div>
                                                    {donor.is_anonymous && (
                                                        <div className="text-xs text-gray-500">Anonymous</div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{donor.donor_email}</TableCell>
                                            <TableCell className="font-medium">{formatCurrency(donor.amount)}</TableCell>
                                            <TableCell>
                                                {getTypeBadge(donor.donation_type)}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(donor.status)}
                                            </TableCell>
                                            <TableCell>{formatDate(donor.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {/* Email and View buttons
                                                    <Button size="sm" variant="outline">
                                                        <Mail className="w-4 h-4 mr-1" />
                                                        Thank
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        View
                                                    </Button>
                                                    */}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="recurring">
                    <div className="border rounded-xl">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Donor Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Next Payment</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recurringDonors.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                            No recurring donations found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    recurringDonors.map(donor => (
                                        <TableRow key={donor.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{donor.donor_name}</div>
                                                    {donor.is_anonymous && (
                                                        <div className="text-xs text-gray-500">Anonymous</div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{donor.donor_email}</TableCell>
                                            <TableCell className="font-medium">{formatCurrency(donor.amount)}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-0">
                                                    {donor.frequency || 'Monthly'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(donor.status)}
                                            </TableCell>
                                            <TableCell>
                                                {donor.next_payment_date ? formatDate(donor.next_payment_date) : 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {renderRecurringActions(donor)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="analytics">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Donation Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Total Donations:</span>
                                    <span className="font-semibold">{donors.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Amount:</span>
                                    <span className="font-semibold">
                                        {formatCurrency(donors.reduce((sum, donor) => sum + parseFloat(donor.amount || 0), 0))}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Average Donation:</span>
                                    <span className="font-semibold">
                                        {donors.length > 0 ? formatCurrency(donors.reduce((sum, donor) => sum + parseFloat(donor.amount || 0), 0) / donors.length) : '$0.00'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Recurring Donors:</span>
                                    <span className="font-semibold">{recurringDonors.length}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                {recentDonors.slice(0, 5).map(donor => (
                                    <div key={donor.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <div className="font-medium">{donor.donor_name}</div>
                                            <div className="text-sm text-gray-500">{formatDate(donor.created_at)}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatCurrency(donor.amount)}</div>
                                            <div className="text-sm">{getStatusBadge(donor.status)}</div>
                                        </div>
                                    </div>
                                ))}
                                {recentDonors.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        No recent donations found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Delete Confirmation Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            Confirm Deletion
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this donor record? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedDonor && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <div className="space-y-2">
                                <div><strong>Donor:</strong> {selectedDonor.donor_name}</div>
                                <div><strong>Email:</strong> {selectedDonor.donor_email}</div>
                                <div><strong>Amount:</strong> {formatCurrency(selectedDonor.amount)}</div>
                                <div><strong>Type:</strong> {selectedDonor.donation_type}</div>
                                <div><strong>Date:</strong> {formatDate(selectedDonor.created_at)}</div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3">
                        <Button 
                            variant="outline" 
                            onClick={() => setDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Donor'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Cancel Subscription Confirmation Dialog */}
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <X className="w-5 h-5 text-red-500" />
                            Cancel Recurring Donation
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel this recurring donation? The donor will no longer be charged automatically.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedDonor && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <div className="space-y-2">
                                <div><strong>Donor:</strong> {selectedDonor.donor_name}</div>
                                <div><strong>Email:</strong> {selectedDonor.donor_email}</div>
                                <div><strong>Amount:</strong> {formatCurrency(selectedDonor.amount)}</div>
                                <div><strong>Frequency:</strong> {selectedDonor.frequency || 'Monthly'}</div>
                                <div><strong>Status:</strong> {selectedDonor.status}</div>
                                <div><strong>Next Payment:</strong> {selectedDonor.next_payment_date ? formatDate(selectedDonor.next_payment_date) : 'N/A'}</div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3">
                        <Button 
                            variant="outline" 
                            onClick={() => setCancelDialogOpen(false)}
                            disabled={isCanceling}
                        >
                            Keep Active
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleCancelConfirm}
                            disabled={isCanceling}
                        >
                            {isCanceling ? 'Canceling...' : 'Cancel Subscription'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            
            // Edit Recurring Donation Dialog
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="w-full max-w-lg sm:rounded-lg">
                <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Edit className="w-5 h-5 text-blue-500" />
                    Edit Recurring Donation
                </DialogTitle>
                <DialogDescription>
                    Update the donor’s recurring donation information below.
                </DialogDescription>
                </DialogHeader>

                {selectedDonor && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-4 space-y-2 text-sm">
                    <div><strong>Current Donor:</strong> {selectedDonor.donor_name}</div>
                    <div><strong>Email:</strong> {selectedDonor.donor_email}</div>
                    <div><strong>Amount:</strong> {formatCurrency(selectedDonor.amount)}</div>
                    <div><strong>Frequency:</strong> {selectedDonor.frequency || 'Monthly'}</div>
                    <div><strong>Status:</strong> {selectedDonor.status}</div>
                    <div><strong>Next Payment:</strong> {selectedDonor.next_payment_date ? formatDate(selectedDonor.next_payment_date) : 'N/A'}</div>
                </div>
                )}

                <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Donor Name</label>
                    <Input
                    type="text"
                    value={editForm.donor_name}
                    onChange={(e) => setEditForm({ ...editForm, donor_name: e.target.value })}
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                    type="email"
                    value={editForm.donor_email}
                    onChange={(e) => setEditForm({ ...editForm, donor_email: e.target.value })}
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Amount (USD)</label>
                    <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Frequency</label>
                    <Select
                    value={editForm.frequency}
                    onValueChange={(value) => setEditForm({ ...editForm, frequency: value })}
                    >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="block text-sm font-medium">Next Payment Date</label>
                    <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !editForm.next_payment_date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editForm.next_payment_date
                            ? format(editForm.next_payment_date, "PPP")
                            : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <CalendarPicker
                        mode="single"
                        selected={editForm.next_payment_date}
                        onSelect={(date) => setEditForm({ ...editForm, next_payment_date: date })}
                        initialFocus
                        />
                    </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                    <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditDialogOpen(false)}
                    disabled={isEditing}
                    className="w-full sm:w-auto"
                    >
                    Cancel
                    </Button>
                    <Button
                    type="submit"
                    disabled={isEditing}
                    className="w-full sm:w-auto"
                    >
                    {isEditing ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
                </form>
            </DialogContent>
            </Dialog>
        </div>
    );
}