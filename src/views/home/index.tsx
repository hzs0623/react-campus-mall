import React from "react";
import { Calendar } from 'antd';
import "./index.less";

const Home:React.FC = () => {
  const onPanelChange = (value:any, mode:any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  return (
    <div className="site-calendar-demo-card">
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  )
}
export default Home;
