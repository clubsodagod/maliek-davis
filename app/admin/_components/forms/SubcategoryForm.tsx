import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { ISubcategoryForm } from "@/database/models/subcategory.model";
import { submitSubcategory } from "@/utility/fetchers/content-manager.fetcher";

export function SubcategoryForm() {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<ISubcategoryForm>({
        defaultValues: {
            name: "",
            tagline: "",
            description: "",
            photo: "",
            video: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const handleFinalSubmit = async (data: ISubcategoryForm) => {
        await submitSubcategory({ ...data });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold">Create a New Subcategory</h2>

            <FormInput name="name" label="Name" control={control} defaultValue="" />
            <FormInput name="tagline" label="Tagline" control={control} defaultValue="" />
            <FormInput name="description" label="Description" control={control} multiline rows={4} defaultValue="" />
            <FormInput name="photo" label="Photo URL" control={control} defaultValue="" />
            <FormInput name="video" label="Video URL (optional)" control={control} defaultValue="" />

            <button type="submit" className="btn w-full mt-4">Submit Subcategory</button>
        </form>
    );
}


