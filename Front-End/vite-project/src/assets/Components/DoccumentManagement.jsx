import React, { useState } from 'react';
import { Upload, Button, Table, Input } from 'antd';

const { Search } = Input;

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

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

  const handleUpload = ({ file }) => {
    const existingDocumentIndex = documents.findIndex(
      (document) => document.name === file.name && document.size === file.size
    );
    if (existingDocumentIndex === -1) {
      const newDocument = {
        name: file.name,
        size: file.size,
        format: file.type,
        creationDate: file.lastModifiedDate.toLocaleDateString(),
        metadata: {
          /* add metadata properties */
        },
      };
      setDocuments([...documents, newDocument]);
    } else {
      const updatedDocuments = [...documents];
      const updatedDocument = { ...updatedDocuments[existingDocumentIndex] };
      updatedDocument.metadata = {
        /* update metadata properties */
      };
      updatedDocuments[existingDocumentIndex] = updatedDocument;
      setDocuments(updatedDocuments);
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
