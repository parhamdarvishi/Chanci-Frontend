"use client";
import { CategoryType } from "@/shared/constants/relative-url/question";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useRouter } from "next/navigation";
import {Course} from "@shared/types/chanci/course";
import {courseAddress} from "@shared/constants/relative-url/course";
import {useState} from "react";
import {postRequest} from "@shared/api";
import toastAlert from "@shared/helpers/toast";

const columns: TableColumns<Course>[] = [
    { 
        head: "Index", 
        key: "id" 
    },
    {
        head: "Course Name",
        key: "name"
    }
];

const Page = () => {
    
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('ExcelFile', file); // Use the name expected by your .NET backend

            const res = await postRequest(courseAddress.AddByUpload, formData, true,true);
            if (res?.isSuccess) {
                toastAlert("Course updated successfully", "success");
            } else {
                toastAlert("Failed to update Course", "error");
            }
        } catch (error) {
            console.error("Error updating Course:", error);
            toastAlert("Failed to update Course", "error");
        } finally {
        }
       
    };
    
    const router = useRouter();
    return (
        <div>
            <PageHeader
                title="Course Management"
                onAddClick={() => router.push('/panel/courses/add')}
            />
            <hr style={{marginTop: '2rem', borderColor: '#ccc'}}/>

            <div
                className="p-4 border rounded max-w-md mx-auto mt-10 shadow-lg"
                style={{
                    backgroundColor: '#f9f9f9',
                    borderColor: '#ddd',
                }}
            >
                <h2
                    className="text-xl font-bold mb-4 text-center"
                    style={{
                        color: '#333',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                    }}
                >
                    Upload Excel File
                </h2>

                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="mb-4 w-full"
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        backgroundColor: '#fff',
                    }}
                />

                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full px-4 py-2 text-white rounded transition-colors duration-200"
                    style={{
                        backgroundColor: uploading ? '#999' : '#2563eb',
                        cursor: uploading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>

                {message && (
                    <p
                        className="mt-4 text-sm text-center"
                        style={{color: '#444', fontStyle: 'italic'}}
                    >
                        {message}
                    </p>
                )}
            </div>

            <hr style={{marginTop: '2rem', borderColor: '#ccc'}}/>
            <TableOnRequest<Course>
                key={0}
                rowsPerPage={10}
                url={courseAddress.GetAll}
                columns={columns}
                actionButtons={[
                    {
                        name: "View Details",
                        externalLink: "/panel/courses/",
                    },
                ]}
            />
        </div>
    );
};

export default Page;
  