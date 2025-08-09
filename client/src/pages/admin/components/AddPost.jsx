import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
const apiKey = import.meta.env.VITE_TINYMCE_API_KEY
const AddPost = () => {
    //get categories.
    const [categories, setCategories] = useState([])
    const editorRef = useRef(null)
    // console.log(apiKey)
    useEffect(() => {
        const getCategories = async function () {
            try {
                const response = await axios.get("/api/v1/category/")
                setCategories(response.data.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getCategories()
    })
    return (
        <>
            <div className="flex flex-col">
                <div className="mb-4">
                    <h1 className="text-black">Add Post</h1>
                </div>
                <div className="flex flex-row">
                    <div className="mr-3">
                        <input
                            type="text"
                            placeholder="Add Title"
                            className="border input input-md border-black focus:outline-none w-64 focus:ring-0"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Add Slug"
                            className="border input input-md border-black w-64 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>
                <div className="flex flex-row mt-5">
                    <div className="mr-3">
                        <input
                            type="file"
                            placeholder="title"
                            className="border file-input border-black focus:outline-none w-64 focus:ring-0"
                        />
                    </div>
                    <div>
                        <select
                            defaultValue=""
                            className="select w-64"
                        >
                            <option
                                value=""
                                disabled
                            >
                                Pick a Category
                            </option>
                            {categories.map((category) => {
                                return (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name.charAt(0).toUpperCase() +
                                            category.name.slice(1)}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div>
                    <Editor
                        apiKey={apiKey}
                        onInit={(_evt, editor) => (editorRef.current = editor)}
                        init={{
                            height: 295,
                            menubar: false,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default AddPost
