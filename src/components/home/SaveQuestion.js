import React, {useState} from 'react'
import {NavLink} from "react-router-dom";

function SaveQuestion() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="4"
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end mb-8">
                        <NavLink
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                            to="/"
                            color='violet'
                            as={NavLink}>CANCLE</NavLink>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            CREATE POST
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


}

export default SaveQuestion
