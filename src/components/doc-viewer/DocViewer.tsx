"use client";

import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import "react-pdf/dist/esm/annotation_layer.css";

const DocViewerComponent = (props: { url: string, name: string }) => {
    const [docData, setDocData] = useState<{ uri: string; fileName: string, fileType: "pdf" }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { url, name } = props;

    useEffect(() => {
        if (url) {
            setLoading(true);
            const docObject = {
                uri: `/api/pdf?url=${encodeURIComponent('https://wheat-coyote-359937.hostingersite.com/media/Videos/packing.pdf')}`,
                fileType: "pdf",
                fileName: name
            } as { uri: string; fileName: string, fileType: "pdf" };
            setDocData([docObject]);
            setLoading(false);
        }
    }, [url])


    return (
        <div className="flex justify-center items-center min-h-screen">
            {!loading && (<DocViewer documents={docData} pluginRenderers={DocViewerRenderers} className="react-doc-viewer" />)}
        </div>
    );
};

export default DocViewerComponent;
