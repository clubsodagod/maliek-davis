"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import { MotionDiv } from "../motion/MotionDiv";

interface RichTextInputProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
}

export default function RichTextInput<T extends FieldValues>({
    name,
    label,
    control,
    defaultValue,
}: RichTextInputProps<T>) {
    return (
        <MotionDiv className="flex flex-col gap-3 w-full max-w-[900px] md:px-12">
            {label && <label className="font-semibold text-lg">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        tinymceScriptSrc='/tinymce/tinymce.min.js'
                        apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                        licenseKey={'gpl'}
                        value={value}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </MotionDiv>
    );
}
