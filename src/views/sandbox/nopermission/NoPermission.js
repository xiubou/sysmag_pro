import React from 'react'
import { Result } from 'antd';

export default function NoPermission() {
  return (
     <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        //extra={<Button type="primary">Back Home</Button>}
      />
  )
}
