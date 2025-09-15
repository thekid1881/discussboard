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
    const body = await req.json()
    const { content, parent_id =null } = body

    if (!content) {
        return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('posts')
        .insert([{ content, parent_id }])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
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