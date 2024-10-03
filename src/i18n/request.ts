import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async ()=>{
    const cookisStore = cookies();
    const locale: string = cookisStore.get('locale')?.value || "es";
    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    }
})