import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

const Roadmap: React.FC = () => (
  <Steps
    items={[
      {
        title: 'Registro',
        status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />,
      },
      {
        title: 'Crear Arbol',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Busqueda',
        status: 'wait',
        icon: <FileSearchOutlined />,
      },
      {
        title: 'Proximamente...',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
);

export default Roadmap;