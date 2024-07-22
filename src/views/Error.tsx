import type { FC } from 'hono/jsx';
import Layout from './Layout';

const Error: FC = (props) => {
	return (
		<Layout title="Error | DailyHot API">
			<main>
				<div className="img">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36">
						<path
							fill="currentColor"
							d="M30 13.5a7.49 7.49 0 0 1-6.78-4.3H4V7h18.57a7.52 7.52 0 0 1-.07-1a7.52 7.52 0 0 1 .07-1H4a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V12.34a7.46 7.46 0 0 1-4 1.16m-13.2 6.33l-10 4.59v-2.64l6.51-3l-6.51-3v-2.61l10 4.59Zm6.6 5.57H17V23h6.4Z"
							class="clr-i-solid--badged clr-i-solid-path-1--badged"
						/>
						<circle
							cx="30"
							cy="6"
							r="5"
							fill="currentColor"
							class="clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge"
						/>
						<path fill="none" d="M0 0h36v36H0z" />
					</svg>
				</div>
				<div className="title">
					<h1 className="title-text">出了点状况...</h1>
					<span className="title tip">运行错误</span>
					{props?.error ? <p className="content">{props.error}</p> : null}
				</div>
			</main>
		</Layout>
	);
};

export default Error;
