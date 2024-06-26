import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getAdminFiles,
  getAdminFolders,
} from '../../../redux/actionCreators/filefoldersActionCreators.js';
import SubNav from '../SubNav.js/index.jsx';

const FolderAdminComponent = () => {
  const { folderId } = useParams();

  const { files, folders, isLoading } = useSelector(
    (state) => ({
      folders: state.filefolders.adminFolders,
      files: state.filefolders.adminFiles,
      isLoading: state.filefolders.isLoading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && (!folders || !files)) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
    }
  }, [dispatch, isLoading]);
  const adminFiles =
    files && files.filter((file) => file.data.parent === folderId);

  const currentFolder =
    folders && folders.find((folder) => folder.docId === folderId);
  if (isLoading) {
    return (
      <Row>
        <Col md="12">
          <h1 className="text-center my-5">Fetching data...</h1>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <SubNav currentFolder={currentFolder} />
      <Row>
        <Col md="12">
          <p className="border-bottom py-2">Created Files</p>
          <div style={{ height: '150px' }} className="pt-2 pb-4 px-5">
            {!files ? (
              <h1 className="text-center">Fetching Files....</h1>
            ) : (
              adminFiles.map(({ data, docId }) => (
                <Col
                  key={docId}
                  md={2}
                  className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                  <FontAwesomeIcon
                    icon={faFile}
                    className="mt-3"
                    style={{ fontSize: '3rem' }}
                  />
                  <p className="mt-3">{data.name}</p>
                </Col>
              ))
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FolderAdminComponent;
