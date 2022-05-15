import NewsPublish from '../../../components/publishmanage/NewsPublish'
import usePublish from '../../../components/publishmanage/usePublish'
import {Button} from 'antd'
export default function Sunset() {
    // 3- 已下线
    const {dataSource,handleDelete} = usePublish(3) // 已下线新闻只能操作删除

    return (
        <>
            <NewsPublish title="sunset" dataSource={dataSource} 
                          button={(id)=><Button danger onClick={()=>handleDelete(id)}>删除</Button>}>
            </NewsPublish>
        </>
    )
}
