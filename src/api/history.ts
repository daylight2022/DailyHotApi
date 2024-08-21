import { RouteType } from '@/types/router';
import { RouteData, ListContext, Options } from '@/types';
import { load } from "cheerio";
import { get } from "../utils/getData.js";
import { getCurrentDateTime } from "@/utils/getTime.js";

export const getRouteData = async (c: ListContext, noCache: boolean) => {
  // 获取日期
  const day = c.req.query("day") || getCurrentDateTime(true).day;
  const month = c.req.query("month") || getCurrentDateTime(true).month;
  const { fromCache, data, updateTime } = await getList({ month, day }, noCache);
  const routeData: RouteData = {
    name: "history",
    title: "历史上的今天",
    type: `${month}-${day}`,
    params: {
      month: "月份",
      day: "日期",
    },
    link: "https://baike.baidu.com/calendar",
    total: data?.length || 0,
    updateTime,
    fromCache,
    data,
  };
  return routeData;
};
const getList = async (options: Options, noCache: boolean) => {
  const { month, day } = options;
    // 进行类型检查，确保 month 和 day 的值存在
  if (month === undefined || day === undefined) {
    throw new Error("Month and day are required");
  }
  const monthStr = month.toString().padStart(2, "0");
  const dayStr = day.toString().padStart(2, "0");
  const url = `https://baike.baidu.com/cms/home/eventsOnHistory/${monthStr}.json`;
  const result = await get({
    url,
    noCache,
    params: {
      _: new Date().getTime(),
    },
  });
  const list = result.data[monthStr][monthStr + dayStr];
  return {
    fromCache: result.fromCache,
    updateTime: result.updateTime,
    data: list.map((v: RouteType["history"], index: number) => ({
      id: index,
      title: load(v.title).text().trim(),
      cover: v.cover ? v.pic_share : null || null,
      desc: load(v.desc).text().trim(),
      year: v.year,
      timestamp: null,
      hot: null,
      url: v.link,
      mobileUrl: v.link,
    })),
  };
};
