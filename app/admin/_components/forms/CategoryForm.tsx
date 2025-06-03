import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import FormMultiSelect from "@/components/FormMultiSelect";
import { ICategoryForm } from "@/database/models/category.model";
import { ObjectId, Types } from "mongoose";

export function CategoryForm() {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<ICategoryForm>({
        defaultValues: {
            name: "",
            slug: "",
            tagline: "",
            description: "",
            subcategories: [],
            photo: "",
            video: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const handleFinalSubmit = async (data: ICategoryForm) => {
        await submitCategory({ ...data });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold">Create a New Category</h2>

            <FormInput name="name" label="Name" control={control} defaultValue="" />
            <FormInput name="slug" label="Slug" control={control} defaultValue="" />
            <FormInput name="tagline" label="Tagline" control={control} defaultValue="" />
            <FormInput name="description" label="Description" control={control} multiline rows={4} defaultValue="" />
            <FormMultiSelect
                name="subcategories"
                label="Subcategories"
                control={control}
                options={[]} // Populate dynamically
                defaultValue={[]}
            />
            <FormInput name="photo" label="Photo URL" control={control} defaultValue="" />
            <FormInput name="video" label="Video URL (optional)" control={control} defaultValue="" />

            <button type="submit" className="btn w-full mt-4">Submit Category</button>
        </form>
    );
}
function submitCategory(arg0: { _id: ObjectId; name: string; slug: string; tagline: string; description: string; subcategories: Types.ObjectId[]; photo: string; video?: string; createdAt: Date; updatedAt: Date; }) {
    console.log(arg0);
    
    throw new Error("Function not implemented.");
}
