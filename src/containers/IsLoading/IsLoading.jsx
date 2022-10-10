import React from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import { MySwal } from '../../helpers/swalHelper';

const IsLoading = (props) => {
  const { children } = props;
  const { loading } = useStore((state) => {
    return {
      loading: state.loading,
    };
  }, shallow);

  if (loading) {
    MySwal.fire({
      title: '載入中',
      timer: 500,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    return <div className="h-full w-full" />;
  }
  return children;
};

export default React.memo(IsLoading);
