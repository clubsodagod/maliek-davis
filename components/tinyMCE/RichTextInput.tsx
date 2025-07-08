"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import { MotionDiv } from "../motion/MotionDiv";
import RelatedPostsList from "./RelatedPostsList";
import AffiliatePartnerLinkList, { AffiliatePartner } from "./AffiliatePartnerLinkList";

interface RichTextInputProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    relatedLinks?: { title: string; slug: string }[];
    affiliatePartners?: AffiliatePartner[];
}

export default function RichTextInput<T extends FieldValues>({
    name,
    control,
    defaultValue,
    relatedLinks,
    affiliatePartners
}: RichTextInputProps<T>) {

    return (
        <MotionDiv className="flex flex-col gap-3 w-full  md:px-12">
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <MotionDiv
                        className={`w-full flex flex-col lg:flex-row gap-6`}
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


                        <div
                            className="lg:w-1/3 lg:min-w-1/3 w-full flex lg:flex-row flex-col  gap-3"
                        >
                            <div
                                className="lg:w-1/2"
                            >
                                <RelatedPostsList
                                    posts={relatedLinks}
                                />
                            </div>

                            <div
                                className="lg:w-1/2"
                            >
                                {
                                    affiliatePartners && affiliatePartners.length > 0 && (
                                            <AffiliatePartnerLinkList
                                                partners={affiliatePartners}
                                            />
                                    )
                                }
                            </div>

                        </div>



                    </MotionDiv>
                )}
            />
        </MotionDiv>
    );
}
