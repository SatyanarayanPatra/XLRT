import React, { useState, useEffect } from 'react';
import { Upload, Button, Table, Input, message } from 'antd';
import axios from 'axios';

const { Search } = Input;

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error(error);
        message.error('Failed to fetch documents');
      }
    };

    fetchDocuments();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortColumn === 'name' && sortOrder,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sorter: (a, b) => a.size - b.size,
      sortOrder: sortColumn === 'size' && sortOrder,
    },
    {
      title: 'Format',
      dataIndex: 'format',
      sorter: (a, b) => a.format.localeCompare(b.format),
      sortOrder: sortColumn === 'format' && sortOrder,
    },
    {
      title: 'Date of Creation',
      dataIndex: 'creationDate',
      sorter: (a, b) => a.creationDate.localeCompare(b.creationDate),
      sortOrder: sortColumn === 'creationDate' && sortOrder,
    },
    {
      title: 'Metadata',
      dataIndex: 'metadata',
      render: (metadata) => (
        <Button type='link' onClick={() => console.log(metadata)}>
          View
        </Button>
      ),
    },
  ];

  const handleUpload = async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('/api/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success(`Uploaded ${file.name}`);
      const response = await axios.get('/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
      message.error(`Failed to upload ${file.name}`);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setFilteredDocuments(
      documents.filter((document) =>
        Object.values(document)
          .join('')
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortColumn(sorter.columnKey);
    setSortOrder(sorter.order);
  };

  return (
    <>
      <Upload onChange={handleUpload}>
        <Button>Upload</Button>
      </Upload>
      <Search
        placeholder='Search documents'
        onChange={(e) => handleSearch(e.target.value)}
        value={searchValue}
      />
      <Table
        dataSource={searchValue ? filteredDocuments : documents}
        columns={columns}
        onChange={handleTableChange}
      />
    </>
  );
};

export default DocumentManagement;
