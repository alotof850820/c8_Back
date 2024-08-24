import { ref } from 'vue';

export const useNextPage = () => {
  const candidateTitleRef = ref<Element>({} as Element);
  const pageRef = ref<Element>({} as Element);

  const isLoading = ref(false);
  const pageIndex = ref(1);
  const pageIndex1 = ref(1);
  const pageIndex2 = ref(1);
  const pageIndex3 = ref(1);

  const resetPageIndex = () => {
    pageIndex.value = 1;
    pageIndex1.value = 1;
    pageIndex2.value = 1;
    pageIndex3.value = 1;
  };
  const setLoading = (status: boolean) => {
    isLoading.value = status;
  };

  const getPageData = async (callbackFn: Function) => {
    setLoading(true);
    const res = await callbackFn();
    setLoading(false);
    return res;
  };

  let observer: IntersectionObserver;

  const setObserver = (callbackFn: Function) => {
    const options = {
      root: pageRef.value,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.0,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && callbackFn());
    }, options);

    observer.observe(candidateTitleRef.value);
  };

  const stopObserving = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  return {
    candidateTitleRef,
    pageRef,
    isLoading,
    pageIndex,
    pageIndex1,
    pageIndex2,
    pageIndex3,
    setObserver,
    resetPageIndex,
    setLoading,
    getPageData,
    stopObserving,
  };
};
