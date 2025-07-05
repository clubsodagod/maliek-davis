"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import { MotionDiv } from "../motion/MotionDiv";
import RelatedPostsList from "./RelatedPostsList";

interface RichTextInputProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    relatedLinks?: { title: string; slug: string }[];
}

export default function RichTextInput<T extends FieldValues>({
    name,
    label,
    control,
    defaultValue,
    relatedLinks,
}: RichTextInputProps<T>) {

    return (
        <MotionDiv className="flex flex-col gap-3 w-full  md:px-12">
            {label && <label className="font-semibold text-lg">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <MotionDiv
                        className={`w-full flex flex-col md:flex-row gap-3`}
                    >

                        <MotionDiv
                            className={`w-full md:min-w-2/3   `}
                        >
                            <Editor
                                tinymceScriptSrc='/tinymce/tinymce.min.js'
                                apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                                licenseKey={'gpl'}
                                value={value}
                                init={{
                                    width: "100%",
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
                        </MotionDiv>


                        {relatedLinks && relatedLinks.length > 0 && (
                            <div
                                className="w-1/3 min-w-1/3"
                            >
                                <RelatedPostsList
                                    posts={relatedLinks}
                                />
                            </div>

                        )
                        }
                    </MotionDiv>
                )}
            />
        </MotionDiv>
    );
}
