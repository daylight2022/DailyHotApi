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
			hot_rank: number;
		};
		author: {
			name: string;
		};
	};
	hellogithub: {
		item_id: string;
		title: string;
		author: string;
		description: string;
		summary: string;
		clicks_total: number;
		updated_at: string;
	};
	baidu: {
		index: number;
		word: string;
		desc: string;
		img: string;
		hotScore: string;
		show: string;
		rawUrl: string;
		query: string;
	};
	bilibili: {
		bvid: string;
		title: string;
		desc?: string;
		pubdate: string;
		pic?: string;
		author?: string;
		video_review?: number;
		owner?: {
			name: string;
		};
		stat?: {
			view: number;
		};
		short_link_v2?: string;
	};
	history: {
		year: string;
		title: string;
		link: string;
		desc: string;
		cover: string;
		pic_share: string;
	};
	tieba: {
		topic_id: number;
		topic_name: string;
		topic_desc: string;
		topic_pic: string;
		topic_url: string;
		discuss_num: number;
		create_time: number;
	};
};
