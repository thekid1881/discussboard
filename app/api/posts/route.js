import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function POST(req) {
    const formData = await req.formData()
    const content = formData.get('content')
    const imageFile = formData.get('image')

    let imageUrl = null

    if (imageFile && typeof imageFile.name === 'string') {
        const fileExt = imageFile.name.splite('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `public/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('post-images')
            .upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false,
                contentType: imageFile.type,
            })

        if (uploadError) {
            return NextResponse.json({ error: uploadError.message }, { status: 500 })
        }

        const { data: publicUrlData } = supabase.storage
            .from('post-images')
            .getPublicUrl(filePath)

        imageUrl = publicUrlData?.publicUrl
    }

    const { data, error } = await supabase
        .from('posts')
        .insert([{ content, image_url: imageUrl }])
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}

export async function DELETE(req) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
        .from('posts')
        .delete()
        .or(`id.eq.${id},parent_id.eq.${id}`);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}