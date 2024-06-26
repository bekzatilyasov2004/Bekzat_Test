import {
  faFileImage,
  faFileAlt,
  faFileAudio,
  faFileVideo,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getAdminFiles,
  getAdminFolders,
  getUserFiles,
  getUserFolders,
} from '../../../redux/actionCreators/filefoldersActionCreators.js';
import SubNav from '../SubNav.js/index.jsx';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, adminFolders, allUserFolders, userId, allUserFiles } =
    useSelector(
      (state) => ({
        isLoading: state.filefolders.isLoading,
        adminFolders: state.filefolders.adminFolders,
        allUserFolders: state.filefolders.userFolders,
        allUserFiles: state.filefolders.userFiles,
        userId: state.auth.userId,
      }),
      shallowEqual
    );

  const userFolders =
    allUserFolders &&
    allUserFolders.filter((folder) => folder.data.parent === '');

  const createdUserFiles =
    allUserFiles &&
    allUserFiles.filter(
      (file) => file.data.parent === '' && file.data.url === ''
    );
  const uploadedUserFiles =
    allUserFiles &&
    allUserFiles.filter(
      (file) => file.data.parent === '' && file.data.url !== ''
    );

  useEffect(() => {
    if (isLoading && !adminFolders) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
    }
    if (!userFolders) {
      dispatch(getUserFiles(userId));
      dispatch(getUserFolders(userId));
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return (
      <Row>
        <Col style={{display:'flex',justifyContent:"center",alignItems:'center',width:'100%',height:'80vh'}} md="12">
          <Spinner  animation="grow" size='xl' variant="success" />
          <Spinner  animation="grow" size='xl' variant="info"  />
          <Spinner  animation="grow" size='xl' variant="secondary" />
          <Spinner  animation="grow" size='xl' variant="warning" />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <SubNav currentFolder="root folder" />
      {adminFolders && adminFolders.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Admin Folders</p>
          <Row style={{ height: '150px' }} className="pt-2 pb-4 px-5">
            {adminFolders.map(({ data, docId }) => (
              <Col
                onClick={() =>
                  history.push(`/dashboard/folder/admin/${docId}`)
                }
                
                key={docId}
                md={2}
                className="border h-100  d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="mt-3"
                  style={{ fontSize: '3rem' }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      {userFolders && userFolders.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Created Folders</p>
          <Row style={{ height: 'auto' }} className="pt-2 gap-2 pb-4 px-5">
            {userFolders.map(({ data, docId }) => (
              <Col
                onClick={() => history.push(`/dashboard/folder/${docId}`)}
                key={docId}
                md={2}
                className="border h-100 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="mt-3"
                  style={{ fontSize: '3rem' }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      {createdUserFiles && createdUserFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Created Files</p>
          <Row style={{ height: 'auto' }} className="pt-2 gap-2 pb-4 px-5">
            {createdUserFiles.map(({ data, docId }) => (
              <Col
                onClick={() => history.push(`/dashboard/file/${docId}`)}
                key={docId}
                md={2}
                className="border h-100 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="mt-3"
                  style={{ fontSize: '3rem' }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      {uploadedUserFiles && uploadedUserFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Uploaded Files</p>
          <Row
            md="2"
            
            style={{ height: 'auto' }}
            className=" my-btn pt-2  gap-2 pb-4 px-5">
            {uploadedUserFiles.map(({ data, docId }) => (
              <Col
                onClick={() => history.push(`/dashboard/file/${docId}`)}
                key={docId}
                md={2}
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('png') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('jpg') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('jpeg') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('svg') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('gif')
                      ? faFileImage
                      : data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('mp4') ||
                        data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('mpeg')
                      ? faFileVideo
                      : data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('mp3')
                      ? faFileAudio
                      : faFileAlt
                  }
                  className="mt-3"
                  style={{ fontSize: '3rem' }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
