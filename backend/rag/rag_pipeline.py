from langchain_community.document_loaders import PyPDFLoader
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_mistralai import MistralAIEmbeddings
import os

def create_vector_store(pdf_path):

    loader = PyPDFLoader(pdf_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_documents(docs)

    embeddings = MistralAIEmbeddings(api_key="RmJMFXmgSD5Cwq5lYi5c5fehRANZoIof")

    vectordb = Chroma.from_documents(
        chunks,
        embeddings,
        persist_directory="./chroma_db"
    )

    return vectordb