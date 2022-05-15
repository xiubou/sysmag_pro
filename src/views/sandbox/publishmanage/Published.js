import NewsPublish from '../../../components/publishmanage/NewsPublish'
import usePublish from '../../../components/publishmanage/usePublish'
import {Button} from 'antd'

export default function Published() {
    // 2-已发布
    const {dataSource,handleSunset} = usePublish(2)  // 已发布新闻只能操作下线

    return (
        <>
            <NewsPublish title="published" dataSource={dataSource} button={(id)=><Button danger onClick={()=>handleSunset(id)}>
                下线
            </Button>}>

            </NewsPublish>
        </>
    )
}