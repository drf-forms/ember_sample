from modeltranslation.translator import translator, TranslationOptions
from .models import Category, Product


class CategoryTranslationOptions(TranslationOptions):
    fields = ('name', )


class ProductTranslationOptions(TranslationOptions):
    fields = ('name', 'description', )


translator.register(Category, CategoryTranslationOptions)
translator.register(Product, ProductTranslationOptions)
