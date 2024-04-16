package com.example.jpatest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAdminEventEntity is a Querydsl query type for AdminEventEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdminEventEntity extends EntityPathBase<AdminEventEntity> {

    private static final long serialVersionUID = -464477401L;

    public static final QAdminEventEntity adminEventEntity = new QAdminEventEntity("adminEventEntity");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgUrl = createString("imgUrl");

    public QAdminEventEntity(String variable) {
        super(AdminEventEntity.class, forVariable(variable));
    }

    public QAdminEventEntity(Path<? extends AdminEventEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAdminEventEntity(PathMetadata metadata) {
        super(AdminEventEntity.class, metadata);
    }

}

