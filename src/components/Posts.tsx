'use client';

import Post from '@/components/post';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Database, PostRow } from '@/lib/supabase';
import { useContext, useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import Skeletons from './Skeletons';
import { Context, ContextType } from '@/components/MainPage';

const PAGE_LENGTH = 15;

interface PostsProps {
  activeToggle: string | null;
  activeOption: string | null;
  supabase: SupabaseClient<Database>;
  needHelp: boolean;
  selectedArea: string;
}

export default function Posts(props: PostsProps) {
  const { needHelp, activeToggle, activeOption, supabase, selectedArea } = props;
  const [pageLength, setPageLength] = useState(PAGE_LENGTH);
  const [backendPosts, setBackendPosts] = useState<PostRow[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { dict } = useContext(Context) as ContextType;

  function filterBySubcategory(posts: PostRow[]) {
    return posts.filter((post) => post.subcategory === activeOption);
  }

  useEffect(() => {
    async function getData() {
      let query = supabase.from('posts').select().eq('need_help', needHelp).limit(pageLength);

      if (selectedArea) {
        query = query.filter('area', 'eq', selectedArea);
      }

      if (activeToggle) {
        query = query.filter('category', 'eq', activeToggle);
      }

      const { data: posts, error } = await query;
      console.log(error?.message); //todo: deal with errors
      return posts;
    }
    getData().then((posts) => {
      setBackendPosts(posts);
      setFilteredPosts(posts);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageLength, needHelp, selectedArea, activeToggle]);

  useEffect(() => {
    let result: PostRow[] | null = backendPosts;
    if (result && activeOption) result = filterBySubcategory(result);

    setFilteredPosts(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption, activeToggle, needHelp, selectedArea]);

  useEffect(() => {
    setPageLength(PAGE_LENGTH);
  }, [needHelp]);

  return (
    <div className="w-full">
      {isLoading && <Skeletons amount={6} />}
      {!isLoading && (
        <p className="text-s text-slate-500 ml-auto mt-2 mb-2">
          {dict.misc.inTotal}: {filteredPosts?.length}
        </p>
      )}

      <div className="relative pb-24  grid grid-cols-1 items-stretch gap-[20px] md:grid-cols-2 lg:grid-cols-3 w-full">
        {filteredPosts &&
          filteredPosts.map((post, index) => {
            return (
              <Post
                key={post.name + index}
                id={post.id}
                area={post.area}
                description={post.description}
                name={post.name}
                phones={post.phones}
                date={new Date(post.time)}
                military={post.military}
                urgency={post.urgency}
                subCategory={post.subcategory}
                category={post.category}
                need_help={post.need_help}
              />
            );
          })}
        <div className="flex justify-center gap-[10px] w-full overflow-x-auto absolute bottom-7">
          <Button
            onClick={() => {
              if (filteredPosts && filteredPosts?.length === pageLength) {
                setPageLength(pageLength + PAGE_LENGTH);
                setIsLoading(true);
              }
            }}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : filteredPosts && filteredPosts?.length === pageLength ? (
              dict.misc.loadMore
            ) : (
              dict.misc.noMore
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
