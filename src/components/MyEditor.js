// components/custom-editor.js
'use client' // only in App Router
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, BlockQuote  } from 'ckeditor5';
import { FormatPainter } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

function CustomEditor() {
    return (
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzE1NDU1OTksImp0aSI6IjFhMWI5NzM3LTNlZWItNDBkNi04NDI0LTAyODA2MWZkODc4YyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiOWJlMTI4ZWIifQ._0bn0i2TpSxYEHm6Ik4Q9WUTc2omEuYHZbNpZoQfeH3zj9gKLgSbWsO0PXbSojJ8N63zNo2-lsXq7ZMHidFyfg',
                plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter, BlockQuote ],
                toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ],
                initialData: '<p>Hello from CKEditor 5 in React!</p>'
            } }
        />
    );
}

export default CustomEditor;
