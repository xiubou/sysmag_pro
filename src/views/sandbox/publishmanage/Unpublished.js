import NewsPublish from '../../../components/publishmanage/NewsPublish'
import usePublish from '../../../components/publishmanage/usePublish'
import {Button} from 'antd'

export default function Unpublished() {
    // 1- 待发布
    const {dataSource,handlePublish} = usePublish(1)  // 未发布新闻只能操作发布

    return (
        <>
            <NewsPublish title="unpublished" dataSource={dataSource} button={(id)=><Button type="primary" onClick={()=>handlePublish(id)}>
                发布
            </Button>} ></NewsPublish>
        </>
    )
}
