import type { FC } from "hono/jsx";
import Layout from "./Layout";

const NotFound: FC = () => {
  return ( 
    <Layout title="404 Not Found | DailyHot API">
      <main>
        <div className="img">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-9q.425 0 .713-.288Q13 12.425 13 12V8q0-.425-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8v4q0 .425.288.712q.287.288.712.288Z"
            />
          </svg>
        </div>
        <div className="title">
          <h1 className="title-text">404 Not Found</h1>
          <span className="title tip">请检查您的路径</span>
        </div>
      </main>
      </Layout>
   );
}
 
export default NotFound;