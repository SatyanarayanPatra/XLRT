// import React, { useState } from 'react';
// import { Modal, Descriptions, Button } from 'antd';

// const DocumentDetails = ({ document }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleView = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <Button type='link' onClick={handleView}>
//         View
//       </Button>
//       <Modal
//         title={document.name}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}>
//         <Descriptions title='Document Metadata'>
//           <Descriptions.Item label='Name'>{document.name}</Descriptions.Item>
//           <Descriptions.Item label='Size'>{document.size}</Descriptions.Item>
//           <Descriptions.Item label='Format'>
//             {document.format}
//           </Descriptions.Item>
//           <Descriptions.Item label='Date of Creation'>
//             {document.creationDate}
//           </Descriptions.Item>
//           {/* display other metadata properties here */}
//         </Descriptions>
//         <iframe
//           src={`https://docs.google.com/gview?url=${document.url}&embedded=true`}
//           style={{ width: '100%', height: '500px' }}
//           frameborder='0'
//         />
//       </Modal>
//     </>
//   );
// };

// export default DocumentDetails;
