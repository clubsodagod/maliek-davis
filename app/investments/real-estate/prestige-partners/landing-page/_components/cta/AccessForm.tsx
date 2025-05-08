import React, { useState } from 'react';
import {
    TextField,
    Button,
    Alert,
    CircularProgress,
    Snackbar,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    OutlinedInput,
    Chip,
    Box,
    Typography,
    SelectChangeEvent
} from '@mui/material';
import { submitPrestigePartnerBuyer } from '@/utility/fetchers/contact.fetchers';

const fundingOptions = [
    { label: 'Cash', value: 'cash' },
    { label: 'Hard Money', value: 'hard_money' },
    { label: 'Private Lender', value: 'private_lender' },
    { label: 'Other', value: 'other' },
];

const marketOptions = ['Detroit', 'Grand Rapids', 'Flint', 'Kalamazoo', 'Saginaw', 'Metro Detroit', 'Traverse City', 'Ann Arbor', 'Lansing', 'Oakland County', 'Wayne County', 'Michgan', 'Ohio', 'Texas', 'Florida', 'Tennessee', 'Arizona', 'Other']; // example
const propertyTypeOptions = ['Single Family', 'Duplex', 'Triplex', 'Apartment', 'Mixed-Use'];

const AccessForm = () => {

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const [formState, setFormState] = useState<{
        fullName: string,
        email: string,
        phone: string,
        companyName: string,
        marketAreas: string[],
        propertyTypes: string[],
        priceRange: { min: number, max: number },
        preferredCloseTime: string,
        fundingSource: string,
        volumeGoalPerMonth: number,
        notes: string,
        proofOfFundsFile: File | null,
    }>({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        marketAreas: [],
        propertyTypes: [],
        priceRange: { min: 0, max: 0 },
        preferredCloseTime: '',
        fundingSource: '',
        volumeGoalPerMonth: 0,
        notes: '',
        proofOfFundsFile: null as File | null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formState.fullName) newErrors.fullName = 'Full name is required';
        if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Valid email is required';
        if (!formState.phone) newErrors.phone = 'Phone number is required';
        if (!formState.priceRange.min || !formState.priceRange.max) newErrors.priceRange = 'Price range required';
        if (!formState.preferredCloseTime) newErrors.preferredCloseTime = 'Closing time required';
        if (!formState.fundingSource) newErrors.fundingSource = 'Funding source required';
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('priceRange')) {
            const key = name.split('.')[1];
            setFormState((prev) => ({
                ...prev,
                priceRange: { ...prev.priceRange, [key]: value },
            }));
        } else {
            setFormState((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSelectChange = (field: 'marketAreas' | 'propertyTypes') => (event: SelectChangeEvent<string[]>) => {
        setFormState((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormState((prev) => ({
            ...prev,
            proofOfFundsFile: file,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const formData = new FormData();
            formData.append('fullName', formState.fullName);
            formData.append('email', formState.email);
            formData.append('phone', formState.phone);
            formData.append('companyName', formState.companyName);
            formData.append('marketAreas', JSON.stringify(formState.marketAreas));
            formData.append('propertyTypes', JSON.stringify(formState.propertyTypes));
            formData.append('priceRangeMin', formState.priceRange.min.toString());
            formData.append('priceRangeMax', formState.priceRange.max.toString());
            formData.append('preferredCloseTime', formState.preferredCloseTime);
            formData.append('fundingSource', formState.fundingSource);
            formData.append('volumeGoalPerMonth', formState.volumeGoalPerMonth.toString());
            formData.append('notes', formState.notes);
            if (formState.proofOfFundsFile) {
                formData.append('proofOfFundsFile', formState.proofOfFundsFile);
            }


            const response = await submitPrestigePartnerBuyer(formState);

            if (response.error) {
                setSubmitError(response.message || 'Something went wrong during submission.');
            } else {
                setSuccessOpen(true);
                // Optionally reset form
                setFormState({
                    fullName: '',
                    email: '',
                    phone: '',
                    companyName: '',
                    marketAreas: [],
                    propertyTypes: [],
                    priceRange: { min: 0, max: 0 },
                    preferredCloseTime: '',
                    fundingSource: '',
                    volumeGoalPerMonth: 0,
                    notes: '',
                    proofOfFundsFile: null,
                });

                // Reset file input element manually
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        } catch (err) {
            console.error('[handleSubmit Error]', err);
            setSubmitError('Unexpected error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    React.useEffect(() => {
        if (formState) {
            console.log(formState);

        }
    }, [formState])
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                <TextField variant="outlined" name="fullName" label="Full Name" fullWidth value={formState.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} />
                <TextField variant="outlined" name="email" label="Email" fullWidth value={formState.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                <TextField variant="outlined" name="phone" label="Phone Number" fullWidth value={formState.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
                <TextField variant="outlined" name="companyName" label="Company Name (optional)" fullWidth value={formState.companyName} onChange={handleChange} />

                <FormControl fullWidth>
                    <InputLabel>Market Areas</InputLabel>
                    <Select
                        multiple
                        value={formState.marketAreas}
                        onChange={handleSelectChange('marketAreas')}
                        input={<OutlinedInput label="Market Areas" />}
                        renderValue={(selected) => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map((v) => <Chip key={v} label={v} />)}</Box>}
                    >
                        {marketOptions.map((area) => <MenuItem key={area} value={area}>{area}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Property Types</InputLabel>
                    <Select
                        multiple
                        value={formState.propertyTypes}
                        onChange={handleSelectChange('propertyTypes')}
                        input={<OutlinedInput label="Property Types" />}
                        renderValue={(selected) => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map((v) => <Chip key={v} label={v} />)}</Box>}
                    >
                        {propertyTypeOptions.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                    </Select>
                </FormControl>

                <Box display="flex" gap={2}>
                    <TextField variant="outlined" name="priceRange.min" label="Min Price" type="number" value={formState.priceRange.min} onChange={handleChange} error={!!errors.priceRange} />
                    <TextField variant="outlined" name="priceRange.max" label="Max Price" type="number" value={formState.priceRange.max} onChange={handleChange} error={!!errors.priceRange} helperText={errors.priceRange} />
                </Box>

                <TextField name="preferredCloseTime" label="Preferred Close Time (days)" type="number" fullWidth value={formState.preferredCloseTime} onChange={handleChange} error={!!errors.preferredCloseTime} helperText={errors.preferredCloseTime} />

                <FormControl fullWidth error={!!errors.fundingSource}>
                    <InputLabel>Funding Source</InputLabel>
                    <Select
                        name="fundingSource"
                        value={formState.fundingSource}
                        onChange={(e) =>
                            setFormState((prev) => ({
                                ...prev,
                                fundingSource: e.target.value,
                            }))
                        }
                    >
                        {fundingOptions.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                    </Select>
                </FormControl>

                <TextField name="volumeGoalPerMonth" label="Monthly Deal Volume Goal" type="number" fullWidth value={formState.volumeGoalPerMonth} onChange={handleChange} />
                <TextField name="notes" label="Notes (Optional)" fullWidth multiline minRows={3} value={formState.notes} onChange={handleChange} />

                <Box>
                    <Typography variant="subtitle2">Upload Proof of Funds (optional)</Typography>
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} ref={fileInputRef} />
                    {formState.proofOfFundsFile?.name ? (
                        <Typography variant="caption" color="textSecondary">
                            Selected: {formState.proofOfFundsFile.name || ""}
                        </Typography>
                    ) : null}
                </Box>

                {submitError && <Alert severity="error">{submitError}</Alert>}

                <Button type="submit" variant="contained" disabled={isSubmitting} startIcon={isSubmitting ? <CircularProgress size={20} /> : null}>
                    {isSubmitting ? 'Submitting...' : 'Request Sourcing Access'}
                </Button>
            </form>

            <Snackbar
                open={successOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Your buy box has been submitted successfully.
                </Alert>
            </Snackbar>
        </>
    );
};

export default AccessForm;
