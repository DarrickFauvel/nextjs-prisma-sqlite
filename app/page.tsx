import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const createPost = async (formData: FormData) => {
  "use server"

  const name = formData.get("name") as string

  await prisma.post.create({
    data: {
      name,
    },
  })

  revalidatePath("/")
}

const deletePost = async (id: string) => {
  "use server"

  await prisma.post.delete({
    where: {
      id,
    },
  })

  revalidatePath("/")
}

const Home = async () => {
  const posts = await prisma.post.findMany()

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <form action={createPost} className="flex flex-col gap-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="text-black"
        />
        <button type="submit">Create</button>
      </form>

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-x-4">
            <div>{post.name}</div>
            <div className="flex items-center">
              <Link href={`/posts/${post.id}`} className="hover:underline">Go To</Link>&nbsp; | &nbsp;
              <Link href={`/posts/${post.id}/edit`} className="hover:underline">Edit</Link>&nbsp; | &nbsp;
              <form action={deletePost.bind(null, post.id)}>
                <button type="submit" className="text-red-500 hover:underline">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
