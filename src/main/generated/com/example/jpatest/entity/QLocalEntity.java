package com.example.jpatest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLocalEntity is a Querydsl query type for LocalEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLocalEntity extends EntityPathBase<LocalEntity> {

    private static final long serialVersionUID = 2116755637L;

    public static final QLocalEntity localEntity = new QLocalEntity("localEntity");

    public final StringPath country = createString("country");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath local = createString("local");

    public QLocalEntity(String variable) {
        super(LocalEntity.class, forVariable(variable));
    }

    public QLocalEntity(Path<? extends LocalEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLocalEntity(PathMetadata metadata) {
        super(LocalEntity.class, metadata);
    }

}

