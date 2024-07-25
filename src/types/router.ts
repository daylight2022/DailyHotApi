export type RouteType = {
	'zhihu-daily': {
		id: number;
		title: string;
		hint: string;
		url: string;
		images: [string];
		type: number;
	};
	zhihu: {
		target: {
			id: string;
			title: string;
			created: number;
			excerpt: string;
		};
		children: [
			{
				thumbnail: string;
			}
		];
		detail_text: string;
	};
	toutiao: {
		ClusterIdStr: string;
		Title: string;
		HotValue: string;
		Image: {
			url: string;
		};
	};
	weibo: {
		word: string;
		word_scheme: string;
		note: string;
		num: number;
		small_icon_desc: string;
		small_icon_desc_color: string;
	};
	douyin: {
		sentence_id: string;
		word: string;
		hot_value: number;
		event_time: number;
	};
	sspai: {
		id: number;
		title: string;
		banner: string;
		summary: string;
		like_count: number;
		released_time: number;
		author: {
			nickname: string;
		};
	};
	juejin: {
		content: {
			content_id: string;
			title: string;
		};
		content_counter: {
			hot_rank: number
		}
		author: {
			name: string;
		};
	};
	hellogithub: {
		item_id: string
		title: string
		author: string
		description: string
		summary: string
		clicks_total: number
		updated_at: string
	}
};
