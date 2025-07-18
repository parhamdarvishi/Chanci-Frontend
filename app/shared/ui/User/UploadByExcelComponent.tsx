import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getRequest, deleteRequest, postRequest } from "@/shared/api";
import {
    Button,
    Card,
    Group,
    Text,
    Title,
    Stack,
    Box,
    Center,
    Loader,
    Select,
    NumberInput,
    Textarea
} from "@mantine/core";
import { CategoryType } from "@/shared/constants/relative-url/question";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";
import { relativePaths } from "@/shared/constants/relative-url/other";
import Editor from "@/shared/ui/RichTextEditor/RichTextEditor";
import {Course, CourseResponse} from "@shared/types/chanci/course";
import {courseAddress} from "@shared/constants/relative-url/course";
import {IndustryResponse, OnlyIndustryResponse} from "@shared/types/chanci/industry";
import {industryAddress} from "@shared/constants/relative-url/industry";
import {userAddresses} from "@shared/constants/relative-url/user";

const UploadByExcelComponent = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [campaignIds, setCampaignIds] = useState('');
    
    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        debugger;
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        try {
            const campaignIdList = campaignIds
                .split(',')
                .map(x => x.trim())         // remove extra spaces
                .filter(x => x !== '')      // remove empty strings
                .map(x => Number(x))        // convert to numbers
                .filter(x => !isNaN(x));    // filter out invalid numbers
            
            const formData = new FormData();
            formData.append('File', file); // Use the name expected by your .NET backend
            campaignIdList.forEach(id => formData.append('CampainListId', id.toString()));
            
            const res = await postRequest(userAddresses.AddByFile, formData, true,true);
            if (res?.isSuccess) {
                toastAlert("data updated successfully", "success");
            } else {
                toastAlert("Failed to update data", "error");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            toastAlert("Failed to update data", "error");
        } finally {
        }

    };

    const router = useRouter();
    return (
        <div>
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
            <Box>
                <Text fw={500} mb={5}>
                    Campaign Contact Ids:
                </Text>
                <Textarea
                    value={campaignIds}
                    onChange={(e) => setCampaignIds(e.target.value)}
                    placeholder="e.g., 8,13"
                    defaultValue="8,13"
                />
            </Box>
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
        </div>
    );
};
export default UploadByExcelComponent;